# Auto-generated script for Ubuntu
# Generated from: ubuntu.md
# Mirror ID: ubuntu

check() {
	source_os_release
	[ "$NAME" = "Ubuntu" ]
}

_ubuntu_install_1() {
	# 替换Ubuntu主仓库
	set_sudo

	if [ -f /etc/apt/sources.list.d/ubuntu.sources ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/ubuntu__etc_apt_sources.list.d_ubuntu.sources.bak ] || $sudo cp /etc/apt/sources.list.d/ubuntu.sources ${_backup_dir}/ubuntu__etc_apt_sources.list.d_ubuntu.sources.bak || {
			print_error "Backup /etc/apt/sources.list.d/ubuntu.sources failed"
			return 1
		}
		$sudo sed -i -E -e "s|^URIs: .*archive.ubuntu.com.*|URIs: $http://$domain/ubuntu/|g" /etc/apt/sources.list.d/ubuntu.sources || {
			print_error "Failed to update /etc/apt/sources.list.d/ubuntu.sources"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list.d/ubuntu.sources does not exist"
	fi

	if [ -f /etc/apt/sources.list ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/ubuntu__etc_apt_sources.list.bak ] || $sudo cp /etc/apt/sources.list ${_backup_dir}/ubuntu__etc_apt_sources.list.bak || {
			print_error "Backup /etc/apt/sources.list failed"
			return 1
		}
		$sudo sed -i -E -e "s|^deb .*ubuntu.*|deb $http://$domain/ubuntu/|g" /etc/apt/sources.list || {
			print_error "Failed to update /etc/apt/sources.list"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list does not exist"
	fi

	return 0
}

_ubuntu_install_2() {
	# 替换Ubuntu Ports源
	set_sudo

	if [ -f /etc/apt/sources.list.d/ubuntu.sources ]; then
		$sudo sed -i -E -e "s|^URIs: .*ports.ubuntu.com.*|URIs: $http://$domain/ubuntu-ports/|g" /etc/apt/sources.list.d/ubuntu.sources || {
			print_error "Failed to update /etc/apt/sources.list.d/ubuntu.sources"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list.d/ubuntu.sources does not exist"
	fi

	if [ -f /etc/apt/sources.list ]; then
		$sudo sed -i -E -e "s|^deb .*ports.ubuntu.com.*|deb $http://$domain/ubuntu-ports/|g" /etc/apt/sources.list || {
			print_error "Failed to update /etc/apt/sources.list"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list does not exist"
	fi

	return 0
}

_ubuntu_install_3() {
	# 替换Ubuntu Security源
	confirm_y "是否 替换Ubuntu Security源?" || return 0

	set_sudo

	if [ -f /etc/apt/sources.list.d/ubuntu.sources ]; then
		$sudo sed -i -E -e "s|^URIs: .*security.ubuntu.com.*|URIs: $http://$domain/ubuntu/|g" /etc/apt/sources.list.d/ubuntu.sources || {
			print_error "Failed to update /etc/apt/sources.list.d/ubuntu.sources"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list.d/ubuntu.sources does not exist"
	fi

	if [ -f /etc/apt/sources.list ]; then
		$sudo sed -i -E -e "s|^deb .*security.ubuntu.com.*|deb $http://$domain/ubuntu/|g" /etc/apt/sources.list || {
			print_error "Failed to update /etc/apt/sources.list"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list does not exist"
	fi

	return 0
}

_ubuntu_install_4() {
	# Update Ubuntu APT sources
	confirm_y "Update Ubuntu APT sources?" || return 0

	set_sudo

	# Execute commands
	$sudo apt-get update

	return 0
}

install() {

	_ubuntu_install_1 || return 1
	_ubuntu_install_2 || return 1
	_ubuntu_install_3 || return 1
	_ubuntu_install_4 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/ubuntu__etc_apt_sources.list.d_ubuntu.sources.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/ubuntu__etc_apt_sources.list.d_ubuntu.sources.bak" /etc/apt/sources.list.d/ubuntu.sources 2>/dev/null || true
		print_info "Restored /etc/apt/sources.list.d/ubuntu.sources"
	fi
	if [ -f ${_backup_dir}/ubuntu__etc_apt_sources.list.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/ubuntu__etc_apt_sources.list.bak" /etc/apt/sources.list 2>/dev/null || true
		print_info "Restored /etc/apt/sources.list"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/ubuntu__etc_apt_sources.list.d_ubuntu.sources.bak ] || [ -f ${_backup_dir}/ubuntu__etc_apt_sources.list.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/apt/sources.list.d/ubuntu.sources ] && grep -q "$domain" /etc/apt/sources.list.d/ubuntu.sources 2>/dev/null && return 0
	[ -f /etc/apt/sources.list ] && grep -q "$domain" /etc/apt/sources.list 2>/dev/null && return 0
	return 1
}
