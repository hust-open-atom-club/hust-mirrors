# Auto-generated script for Debian
# Generated from: debian.md
# Mirror ID: debian

check() {
	source_os_release
	[ "$NAME" = "Debian GNU/Linux" ]
}

_debian_install_1() {
	# 替换Debian主仓库
	set_sudo

	# 对于Debian 12及**以上**版本，使用这个命令
	if [ -f /etc/apt/sources.list.d/ubuntu.sources ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/debian__etc_apt_sources.list.d_ubuntu.sources.bak ] || $sudo cp /etc/apt/sources.list.d/ubuntu.sources ${_backup_dir}/debian__etc_apt_sources.list.d_ubuntu.sources.bak || {
			print_error "Backup /etc/apt/sources.list.d/ubuntu.sources failed"
			return 1
		}
		$sudo sed -i -E -e "s|^URIs: .*deb.debian.com.*|URIs: $http://$domain/debian/|g" /etc/apt/sources.list.d/ubuntu.sources || {
			print_error "Failed to update /etc/apt/sources.list.d/ubuntu.sources"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list.d/ubuntu.sources does not exist"
	fi

	# 对于Debian 11及**以下**版本，使用这个命令
	if [ -f /etc/apt/sources.list ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/debian__etc_apt_sources.list.bak ] || $sudo cp /etc/apt/sources.list ${_backup_dir}/debian__etc_apt_sources.list.bak || {
			print_error "Backup /etc/apt/sources.list failed"
			return 1
		}
		$sudo sed -i -E -e "s|^deb .*debian.*|deb $http://$domain/debian/|g" /etc/apt/sources.list || {
			print_error "Failed to update /etc/apt/sources.list"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list does not exist"
	fi

	return 0
}

_debian_install_2() {
	# Execute commands
	set_sudo

	# Execute commands
	$sudo apt-get update

	return 0
}

install() {

	_debian_install_1 || return 1
	_debian_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/debian__etc_apt_sources.list.d_ubuntu.sources.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/debian__etc_apt_sources.list.d_ubuntu.sources.bak" /etc/apt/sources.list.d/ubuntu.sources 2>/dev/null || true
		print_info "Restored /etc/apt/sources.list.d/ubuntu.sources"
	fi
	if [ -f ${_backup_dir}/debian__etc_apt_sources.list.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/debian__etc_apt_sources.list.bak" /etc/apt/sources.list 2>/dev/null || true
		print_info "Restored /etc/apt/sources.list"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/debian__etc_apt_sources.list.d_ubuntu.sources.bak ] || [ -f ${_backup_dir}/debian__etc_apt_sources.list.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/apt/sources.list.d/ubuntu.sources ] && grep -q "$domain" /etc/apt/sources.list.d/ubuntu.sources 2>/dev/null && return 0
	[ -f /etc/apt/sources.list ] && grep -q "$domain" /etc/apt/sources.list 2>/dev/null && return 0
	return 1
}
