# Auto-generated script for openEuler
# Generated from: openeuler.md
# Mirror ID: openeuler



_openeuler_install_1() {
	# 替换Linux Mint主仓库
	set_sudo

	if [ -f /etc/yum.repos.d/openEuler.repo ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/openeuler__etc_yum.repos.d_openEuler.repo.bak ] || $sudo cp /etc/yum.repos.d/openEuler.repo ${_backup_dir}/openeuler__etc_yum.repos.d_openEuler.repo.bak || {
			print_error "Backup /etc/yum.repos.d/openEuler.repo failed"
			return 1
		}
		$sudo sed -i -E -e "s|http://repo.openeuler.org|$http://$domain/openeuler|g" /etc/yum.repos.d/openEuler.repo || {
			print_error "Failed to update /etc/yum.repos.d/openEuler.repo"
			return 1
		}
	else
		print_warning "File /etc/yum.repos.d/openEuler.repo does not exist"
	fi

	# 目前本镜像站暂不支持 openEuler 的 metalink 功能，因此需要注释相关行
	if [ -f /etc/yum.repos.d/openEuler.repo ]; then
		$sudo sed -i -E -e "s|\\(metalink=.*$\\)|# \\1|g" /etc/yum.repos.d/openEuler.repo || {
			print_error "Failed to update /etc/yum.repos.d/openEuler.repo"
			return 1
		}
	else
		print_warning "File /etc/yum.repos.d/openEuler.repo does not exist"
	fi

	return 0
}

_openeuler_install_2() {
	# Execute commands
	set_sudo

	# Execute commands
	$sudo dnf update

	return 0
}

install() {

	_openeuler_install_1 || return 1
	_openeuler_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/openeuler__etc_yum.repos.d_openEuler.repo.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/openeuler__etc_yum.repos.d_openEuler.repo.bak" /etc/yum.repos.d/openEuler.repo 2>/dev/null || true
		print_info "Restored /etc/yum.repos.d/openEuler.repo"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/openeuler__etc_yum.repos.d_openEuler.repo.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/yum.repos.d/openEuler.repo ] && grep -q "$domain" /etc/yum.repos.d/openEuler.repo 2>/dev/null && return 0
	return 1
}
